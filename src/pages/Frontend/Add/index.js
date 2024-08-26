import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
// import { HomeContext } from "../../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { message } from "antd";

export default function Add() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { user, setIsAppLoading } = useContext(AuthContext);
  // const { addItems } = useContext(HomeContext);
  const navigate = useNavigate("");
  // const {id} = useContext(HomeContext);
  // const {setId} = useContext(HomeContext);
  const id =
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  // const getRandomId = () => Math.random().toString(36).slice(2)

  // setId(getRandomId());

  const handlesubmit = async (e) => {
    e.preventDefault();
    // addItems({ name, description, price, category, id });
    let data = {
      name,
      description,
      price,
      category,
      id,
      dateCreated: serverTimestamp(),
      createdBy: { uid: user.uid },
    };
    if (file) {
      uploadImage(data);
    } else {
      addItem(data);
    }
  };
  const uploadImage = (data) => {
    const storageRef = ref(storage, "Images/" + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
        message.error("Error uploading", 3);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          let updatedData = { ...data, imageUrl: downloadURL };
          addItem(updatedData);
        });
      }
    );
  };
  const addItem = async (data) => {
    setIsAppLoading(true);
    try {
      await setDoc(doc(firestore, "items", data.id), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsAppLoading(false);
    }
    navigate("/");
    // console.log(process.env.REACT_APP_NAME);
  };

  return (
    <main className="frontend py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="card border-none mx-auto p-3 p-md-4"
              style={{ maxWidth: 400 }}
            >
              <h2 className="text-primary text-center mb-4">Add-Items</h2>
              <form onSubmit={handlesubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Items name here"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Enter Items description here"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="Enter Items price here"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      placeholder="Enter Items category here"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>{" "}
                  <div className="col-12 mb-4">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      // placeholder="Enter Items category here"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100">Add</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
