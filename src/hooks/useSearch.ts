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
  const [isLoading, setIsLoading] = useState(false);
  const [dataEmails, setDataEmails] = useState<data[]>([]);

  const getLinksUrl = import.meta.env.VITE_APP_GET_LINKS;
  const getEmailsUrl = import.meta.env.VITE_APP_GET_EMAILS;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues({
      ...searchValues,
      search: e.target.value,
    });
  };

  const handleLimit = (value: string) => {
    console.log(value);
    setSearchValues({
      ...searchValues,
      limit: parseInt(value),
    });
  };

  const getEmails = async (
    links: string[],
    emailCount: number,
    linksPerRequest: number = 6
  ) => {
    let collectedEmails: data[] = [];
    while (dataEmails.length < emailCount) {
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

            collectedEmails = [...collectedEmails, ...uniqueEmailsInResponse];
            setDataEmails(collectedEmails);
          }
        }

        if (collectedEmails.length >= emailCount) {
          break;
        }
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
      const { data: dataLinks } = await axios.get(`${getLinksUrl}`, {
        params: {
          query: searchValues.search,
          pageCount: 10,
        },
      });

      await getEmails(dataLinks, searchValues.limit);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
  };
};