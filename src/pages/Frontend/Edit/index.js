import React, { useContext, useState } from "react";
import { HomeContext } from "../../../context/HomeContext";
import { useNavigate, useParams } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

export default function Edit() {
  const { currentitem } = useContext(HomeContext);
  const { setIsAppLoading } = useContext(AuthContext);
  // const [name,setName]=useState('')
  const [name, setName] = useState(currentitem.name);
  const [description, setDescription] = useState(currentitem.description);
  const [price, setPrice] = useState(currentitem.price);
  const [category, setCategory] = useState(currentitem.category);
  const params = useParams();
  const navigate = useNavigate("");
  // const {name,description,price,category}=currentitem
  const onedit = async (e) => {
    e.preventDefault();

    setIsAppLoading(true);
    try {
      await updateDoc(doc(firestore, "items", currentitem.id), {
        ...currentitem,
        name,
        description,
        price,
        category,
        dateModified: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating document: ", err);
    } finally {
      setIsAppLoading(false);
    }
    // const items = JSON.parse(localStorage.getItem('items')) || []
    // const updateitem = {
    //   ...currentitem,
    //   name,
    //   description,
    //   price,
    //   category,
    // };
    // const updateditems=items.map(item => (item.id === currentitem.id ? updateitem : item) )
    // localStorage.setItem('items',JSON.stringify(updateditems))
    navigate("/");
  };

  const oncancel = () => {
    console.log("Params", params);
    console.log("Params.id", params.id);
    navigate("/");
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
              <h2 className="text-primary text-center mb-4">Update-Items</h2>
              <div className="row">
                <div className="col-12 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Items name here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Enter Items description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    placeholder="Enter Items price here"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    placeholder="Enter Items category here"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <form onSubmit={onedit} className="mb-3">
                  <div className="col-12">
                    <button className="btn btn-primary w-100">Confirm</button>
                  </div>
                </form>
                <form onSubmit={oncancel}>
                  <div className="col-12">
                    <button className="btn btn-danger w-100">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
