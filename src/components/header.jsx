export const Header = ({pageTitle}) => {
  return (
    <header className="p-2 w-full flex justify-between header-background items-center mb-5">
      <h1 className="font-bold text-lg text-white">{pageTitle}</h1>
      <button className="p-4 py-3 rounded-lg bg-blue-500 text-white font-medium">
        Sign Out
      </button>
    </header>
  );
};
