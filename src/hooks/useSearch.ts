import { useState } from "react";
import axios from "axios";

interface data {
  email: string;
  link: string;
}

export const useSearch = () => {
  const [searchValues, setSearchValues] = useState({
    search: "",
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataEmails, setDataEmails] = useState<data[]>([]);
  const [options, setOptions] = useState({
    showAllLinks: true,
    showAllLinksWithNoEmails: false,
    keepSearching: false,
  });
  const [links, setLinks] = useState<string[]>([]);
  const [linksWithNoEmails, setLinksWithNoEmails] = useState<string[]>([]);

  const getLinksUrl = import.meta.env.VITE_APP_GET_LINKS;
  const getEmailsUrl = import.meta.env.VITE_APP_GET_EMAILS;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues({
      ...searchValues,
      search: e.target.value,
    });
  };

  const handleLimit = (value: string) => {
    setSearchValues({
      ...searchValues,
      limit: parseInt(value),
    });
  };

  const handleShowAllLinks = () => {
    setOptions({
      ...options,
      showAllLinks: !options.showAllLinks,
    });
    const newOptions = {
      ...options,
      showAllLinks: !options.showAllLinks,
    };
    localStorage.setItem("options", JSON.stringify(newOptions));
  };

  const handleShowAllLinksWithNoEmails = () => {
    setOptions({
      ...options,
      showAllLinksWithNoEmails: !options.showAllLinksWithNoEmails,
    });
    const newOptions = {
      ...options,
      showAllLinksWithNoEmails: !options.showAllLinksWithNoEmails,
    };
    localStorage.setItem("options", JSON.stringify(newOptions));
  };

  const handleKeepSearching = () => {
    setOptions({
      ...options,
      keepSearching: !options.keepSearching,
    });
    const newOptions = {
      ...options,
      keepSearching: !options.keepSearching,
    };
    localStorage.setItem("options", JSON.stringify(newOptions));
  };

  const firstLoadOptions = (
    showAllLinks: boolean,
    showAllLinksWithNoEmails: boolean,
    keepSearching: boolean
  ) => {
    setOptions({
      showAllLinks,
      showAllLinksWithNoEmails,
      keepSearching,
    });
  };

  const getEmails = async (
    links: string[],
    emailCount: number,
    linksPerRequest: number = 4
  ) => {
    let collectedEmails: data[] = [];
    let linksWithNoEmails: string[] = [];
    let hasMoreLinks = true;

    if (options.keepSearching) {
      emailCount = 999;
    }

    while (hasMoreLinks && collectedEmails.length < emailCount) {
      const currentLinks = links.slice(0, emailCount - collectedEmails.length);
      try {
        const chunks = [];

        for (let i = 0; i < currentLinks.length; i += linksPerRequest) {
          chunks.push(currentLinks.slice(i, i + linksPerRequest));
        }

        const responses = await Promise.all(
          chunks.map((chunk) =>
            fetch(getEmailsUrl, {
              method: "POST",
              body: JSON.stringify({ links: chunk }),
            }).then((res) => res.json())
          )
        );

        for (const data of responses) {
          if (data && data.emails && Array.isArray(data.emails)) {
            const uniqueEmailsInResponse = data.emails.filter((email: data) => {
              const isDuplicate = collectedEmails.some(
                (collectedEmail) => collectedEmail.email === email.email
              );
              return !isDuplicate;
            });

            const blackList = JSON.parse(
              localStorage.getItem("blacklist") || "[]"
            );

            // Remove blacklisted emails
            const filteredEmails = uniqueEmailsInResponse.filter(
              (email: { email: string }) =>
                !blackList.some((word: string) => email.email.includes(word))
            );

            setDataEmails((prev) => [...prev, ...filteredEmails]);

            const linksInResponse = data.emails.map(
              (email: data) => email.link
            );
            const linksInResponseSet = new Set(linksInResponse);
            const linksInCurrentLinks = currentLinks.filter((link) => {
              return !linksInResponseSet.has(link);
            });
            linksWithNoEmails = [...linksWithNoEmails, ...linksInCurrentLinks];
            collectedEmails = [...collectedEmails, ...uniqueEmailsInResponse];

            // setDataEmails(collectedEmails);
            setLinksWithNoEmails(linksWithNoEmails);
          } else {
            currentLinks.forEach((link) => {
              if (!linksWithNoEmails.includes(link)) {
                linksWithNoEmails.push(link);
              }
            });
          }
        }

        hasMoreLinks = currentLinks.length > 0;
      } catch (error) {
        console.log(error);
      }

      links = links.slice(emailCount - collectedEmails.length);
    }
  };

  const getEmailElements = async () => {
    try {
      setIsLoading(true);
      setDataEmails([]);
      setLinks([]);
      setLinksWithNoEmails([]);
      const { data: dataLinks } = await axios.get(`${getLinksUrl}`, {
        params: {
          query: searchValues.search,
          pageCount: 17,
        },
      });
      setLinks(dataLinks);
      await getEmails(dataLinks, searchValues.limit);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const copyToClipboardAllEmails = async () => {
    const emails = dataEmails.map((email) => email.email).join(", ");
    await navigator.clipboard.writeText(emails);
  };

  return {
    dataEmails,
    setDataEmails,
    searchValues,
    setSearchValues,
    isLoading,
    handleSearch,
    handleLimit,
    getEmailElements,
    options,
    handleShowAllLinks,
    handleShowAllLinksWithNoEmails,
    links,
    linksWithNoEmails,
    copyToClipboard,
    handleKeepSearching,
    copyToClipboardAllEmails,
    firstLoadOptions,
  };
};
