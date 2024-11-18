const Navigation: React.FC = () => {
  return (
  <nav>
      <div className="rounded flex justify-between items-center p-3">
        <div className="rounded p-3 text-black text-2xl">Time Away</div>
        <div className="flex space-x-6">
          <button
          className="button-cyan">New Request</button>
        </div>
      </div>
    </nav>
  )
};

export default Navigation;
