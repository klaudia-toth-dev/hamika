import React from "react";

export default function Error({ success }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);
  return (
    <div>
      {visible ? (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      ) : null}
    </div>
  );
}
