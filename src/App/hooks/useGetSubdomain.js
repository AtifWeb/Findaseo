import { useEffect, useState } from "react";
import { parse } from "tldjs";

const useGetSubdomain = () => {
  const [protocol] = useState(window.location.protocol);
  const [host] = useState(window.location.host);
  const [subdomain, setSubdomain] = useState({});

  useEffect(() => {
    let data = parse(`${protocol}//${host}`);
    data.subdomain = 'www.localhost'
    setSubdomain({
      ...data,
      subdomain: data?.subdomain.replace("www.", ""),
      domain:
        data?.domain + (window.location.port ? ":" + window.location.port : ""),
    });
    return () => {};
  }, [protocol, host]);
  return subdomain;
};

export default useGetSubdomain;
