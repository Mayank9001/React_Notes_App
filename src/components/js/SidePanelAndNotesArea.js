import React, { useState, useEffect } from "react";
import "../css/SidePanelAndNotesArea.css";
import Modal from "../js/Modal";
import Feature from "../assets/Feature.png";
import Lock from "../assets/Lock.png";
import Notes from "../js/Notes";

const SidePanelAndNotesArea = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem("groups");
      if (storedGroups) {
        let groups = await JSON.parse(storedGroups);
        setGroups(groups);
      }
    };
    fetchGroup();
  }, []);

  const handleClick = (group) => {
    setGroupSelect(group);
  };

  const grpInitials = (groupName) => {
    const words = groupName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    }
  };

  return (
    <>
      {screenSize.width < 768 ? (
        <>
          <div className="sidebarContainerMobile">
            {groupSelect ? (
              <Notes
                groupSelect={groupSelect}
                groups={groups}
                setGroups={setGroups}
              />
            ) : (
              <>
                <h1 className="headingMobile">Pocket Notes</h1>
                <button
                  className="CreateButtonMobile"
                  onClick={() => setOpenModal(true)}
                >
                  + Create Notes group
                </button>
                <div className="GroupList">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className={`groupItem ${
                        groupSelect === group ? "selected" : ""
                      }`}
                      onClick={() => handleClick(group)}
                    >
                      <div
                        className="groupIcon"
                        style={{ background: group.color }}
                      >
                        {groupSelect.groupName
                          ? grpInitials(groupSelect.groupName)
                          : ""}
                      </div>
                      <h2 className="groupName">{group.groupName}</h2>
                    </div>
                  ))}
                </div>
              </>
            )}

            {openModal && (
              <Modal
                closeModal={setOpenModal}
                setGroups={setGroups}
                groups={groups}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="side-panel-container">
            <h1
              className="
            title"
            >
              Pocket Notes
            </h1>
            <button
              className="create-button"
              onClick={() => setOpenModal(true)}
            >
              +
            </button>
            <div className="groupList">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`groupItem ${
                    groupSelect === group ? "selected" : ""
                  }`}
                  onClick={() => handleClick(group)}
                >
                  <div
                    className="groupInitials"
                    style={{
                      background: group.color,
                    }}
                  >
                    {group.groupName ? grpInitials(group.groupName) : ""}
                  </div>
                  <h2 className="groupName">{group.groupName}</h2>
                </div>
              ))}
            </div>
          </div>
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
          <div className="Notes-Area-Container">
            {groupSelect ? (
              <Notes
                groupSelect={groupSelect}
                groups={groups}
                setGroups={setGroups}
              />
            ) : (
              <>
                <div className="NotesAreaText">
                  <img src={Feature} alt="Feature"></img>
                  <h2 className="NotesAreaTitle">Pocket Notes</h2>
                  <p className="NotesAreaMessage">
                    Send and receive messages without keeping your phone online.
                    <br />
                    Use Pocket Notes on up to 4 linked devices and 1 mobile
                    phone
                  </p>
                </div>
                <footer className="NotesAreaEncryption">
                  <img className="lockImg" src={Lock} alt="Lock"></img>
                  end-to-end encrypted
                </footer>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SidePanelAndNotesArea;
