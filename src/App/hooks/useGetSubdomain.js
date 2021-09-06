import { useEffect, useState } from "react";
import { parse } from "tldjs";

const useGetSubdomain = () => {
  const [protocol] = useState(window.location.protocol);
  const [host] = useState(window.location.host);
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    setSubdomain(parse(`${protocol}//${host}`).subdomain.replace("www.", ""));
    return () => {};
  }, [protocol, host]);
  return subdomain;
};

export default useGetSubdomain;
