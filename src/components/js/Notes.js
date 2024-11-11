import React, { useState, useEffect } from "react";
import backIcon from "../assets/backIcon.png";
import sendIcon from "../assets/SendIcon.png";
import styles from "../css/Notes.module.css";
import dot from "../assets/Dot.png";

const Notes = (props) => {
  const [note, setNotes] = useState("");

  let groupSelect = props.groupSelect;
  let notes = groupSelect.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", screen);
  }, []);

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = () => {
    if (note.trim() === "") {
      alert("Please enter a note");
      return;
    }
    let newGroup = [...groups];
    let groupId = newGroup[groupSelect.id];
    let time = `${new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
    let date = `${new Date().toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
    console.log(props);
    console.log(newGroup);
    console.log(groupId);
    console.log(note.length);
    groupId["notes"].push({ date, time, note });
    localStorage.setItem("groups", JSON.stringify(newGroup));
    setGroups(newGroup);
    setNotes("");
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
          <div className={styles.notesContainer}>
            <div className={styles.notesHeader}>
              <img
                src={backIcon}
                alt="back"
                onClick={() => {
                  window.location.reload();
                }}
              />
              <div
                className={styles.notesGroup}
                style={{ background: groupSelect.color }}
              >
                {groupSelect.groupName
                  ? grpInitials(groupSelect.groupName)
                  : ""}
              </div>
              <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
            </div>
            <div className={styles.NotesAndDateMobile}>
              {notes.map((note) => (
                <div className={styles.DateAndText}>
                  <div className={styles.DateAndTime}>
                    <p className={styles.TimeMobile}>{note.time}</p>
                    <p className={styles.DateMobile}>{note.date}</p>
                  </div>
                  <p className={styles.TextMobile}>{note.note}</p>
                </div>
              ))}
            </div>
            <div className={styles.TextareaMobile}>
              <textarea
                className={styles.TextInputMobile}
                type="text"
                value={note}
                onChange={handleChange}
                placeholder="Enter your text here..."
              ></textarea>
              <img
                src={sendIcon}
                className={styles.SendImgMobile}
                alt="SendImg"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.notesContent}>
            <div className={styles.notesHeading}>
              <div
                className={styles.notesInitials}
                style={{
                  background: groupSelect.color,
                }}
              >
                {groupSelect.groupName
                  ? grpInitials(groupSelect.groupName)
                  : ""}
              </div>
              <h2 className={styles.noteName}>{groupSelect.groupName}</h2>
            </div>
            <div className={styles.notesList}>
              {notes.map((note) => (
                <div className={styles.noteAndTimeStamp}>
                  <p className={styles.note}>{note.note}</p>
                  <div className={styles.timeStamp}>
                    <p className={styles.Date}>{note.date}</p>
                    <img src={dot} alt="" className={styles.dotImg}></img>
                    <p className={styles.Time}>{note.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.notesInputArea}>
              <textarea
                className={styles.textAreaInput}
                style={{ resize: "none" }}
                type="text"
                value={note}
                onChange={handleChange}
                placeholder="Enter your text here..........."
                // onKeyDown={keypress}
              ></textarea>
              <img
                src={sendIcon}
                className={styles.sendIcon}
                alt="sendIcon"
                onClick={handleSubmit}
              ></img>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notes;
