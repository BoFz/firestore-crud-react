import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";

import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentID] = useState("");

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New Link Added", {
          type: "success",
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link Updated Successfuly", {
          type: "info",
        });
        setCurrentID("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to deleted this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentID(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to Wensite
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
