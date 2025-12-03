export const PageHeaderWrapper = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 pb-4">
      {children}
    </div>
  );
};
