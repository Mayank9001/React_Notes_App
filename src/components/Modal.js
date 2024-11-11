import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const setGroups = props.setGroups;
  const groups = props.groups;
  const [formData, setFormData] = useState({ grpName: " ", color: " " });
  const color = [
    "#6691FF",
    "#0047FF",
    "#F19576",
    "#43E7FC",
    "#FF79F2",
    "#B38BFA",
  ];

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
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute("color"),
    });
  };

  const handleSubmit = (e) => {
    if (formData.color === "") {
      alert("Please select a color");
      return;
    }
    let newGrp = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGrp);
    localStorage.setItem("groups", JSON.stringify(newGrp));
    props.closeModal(false);
  };
  
  return (
    <>
      {screenSize.width < 989 ? (
        <></>
      ) : (
        <div className={styles.modal}>
          <div className={styles.innerModal}>
            <span>
              <button
                className={styles.closebutton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.createGrp}>Create New Group</h2>
            <label className={styles.grpName}>Group Name</label>
            <input
              type="text"
              required
              className={styles.enterText}
              name="grpName"
              placeholder="Enter group name"
              onChange={handleChange}
            />
            <label className={styles.chooseColor}>Choose color</label>
            {color.map((color, index) => (
              <button
                className={`${styles.colorBtnStyles} 
                ${formData.color === color ? "selected" : ""}`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  background: color,
                }}
                onClick={
                  handleColorChange}
              ></button>
            ))}
            <button className={styles.createBtn} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
