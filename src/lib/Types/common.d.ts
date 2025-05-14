declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

declare type RouteProps = {
  searchParams: SearchParams;
  params: { locale: string };
};

declare type ErrorProps = {
  error: Error;
  reset: () => void;
};
