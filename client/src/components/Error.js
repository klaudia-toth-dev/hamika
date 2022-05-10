import React from "react";

export default function Error({ error }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);

  return (
    <div>
      {visible ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
