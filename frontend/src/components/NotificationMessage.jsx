import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

const NotificationMessage = () => {
  const { messageId } = useParams();
  const { data } = useOutletContext();

  return (
    <div className="w-full h-[92vh] p-5">
      <h1 className="text-xl font-bold">{data.mails[messageId].subject}</h1>
      <p className="text-lg text-foreground/50">{data.mails[messageId].name}</p>
      <p className="text-sm text-foreground/50 mb-6">
        {data.mails[messageId].email}
      </p>

      <p className="text-justify text-foreground/80 leading-8">
        {data.mails[messageId].message}
      </p>
    </div>
  );
};

export default NotificationMessage;
