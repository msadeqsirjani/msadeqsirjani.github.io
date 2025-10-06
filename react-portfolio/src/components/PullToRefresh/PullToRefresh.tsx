const PullToRefresh = () => {
  return (
    <div className="pull-to-refresh" id="pullToRefresh">
      <div className="pull-to-refresh-icon-wrapper">
        <svg className="pull-to-refresh-progress" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="22" strokeDasharray="138.2" strokeDashoffset="138.2"></circle>
        </svg>
        <div className="pull-to-refresh-icon"></div>
      </div>
    </div>
  );
};

export default PullToRefresh;
