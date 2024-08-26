import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeContext } from "../../../context/HomeContext";
import { firestore } from "../../../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";

export default function Home() {
  // const user = auth.currentUser;
  const { user, setIsAppLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const { currentitem } = useContext(HomeContext);
  const { setCurrentitem } = useContext(HomeContext);
  const navigate = useNavigate("");

  const getitems = useCallback(async () => {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "items"),
        where("createdBy.uid", "==", user.uid),
        orderBy("dateCreated", "desc"),
        limit(10)
      )
    );
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // console.log(doc.id, " => ", data);
      array.push(data);
    });
    setItems(array);
  }, [user.uid]);
  useEffect(() => {
    getitems();
  }, [getitems]);

  // const handleedit = (e) => {
  //   e.preventDefault();
  //   navigate("/Edit");
  // };
  const ondelete = async (e) => {
    e.preventDefault();
    // const items = JSON.parse(localStorage.getItem("items")) || [];
    // const updateditems = items.filter((item) => item.id !== currentitem.id);
    // localStorage.setItem("items", JSON.stringify(updateditems));
    // setIsAppLoading(true);
    try {
      await deleteDoc(doc(firestore, "items", currentitem.id));
      const updateditems = items.filter((item) => item.id !== currentitem.id);
      setItems(updateditems);
    } catch (error) {
      console.error("Error removing document: ", error);
    } finally {
      setIsAppLoading(false);
    }
  };

  return (
    <main className="frontend py-5">
      <div className="container">{/* <h1>Welcome, {user.email}</h1> */}</div>
      <div>
        <h1>Menu</h1>
        <button className="btn btn-primary" onClick={() => navigate("/Add")}>
          Add Menu Items
        </button>
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <td>#</td>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt="moon.png"
                              className="rounded-circle"
                              style={{ width: 50, height: 50 }}
                            />
                          )}
                        </td>
                        <td>
                          {/* <form onSubmit={handleedit} className="d-inline">
                            <button
                              className="btn btn-primary mx-1 "
                              onClick={() => {
                                setCurrentitem(item);
                              }}
                              // data-bs-toggle="modal"
                              // data-bs-target="#editModal"
                            >
                              Edit
                            </button>
                          </form> */}
                          <Link
                            to={`/Edit/${item.id}`}
                            className="btn btn-primary"
                          >
                            {" "}
                            Edit
                          </Link>
                          <form onSubmit={ondelete} className="d-inline">
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setCurrentitem(item);
                              }}
                              // data-bs-toggle="modal"
                              // data-bs-target="#deleteModal"
                            >
                              Delete
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <button className='btn btn-primary'>Place Order</button> */}
              {/* {isAdding && <Addtodo onAdd={handleAddTodo} onClose={() => setIsAdding(false)} />}
                            {isEditing && (
                                <Edittodo
                                    todo={currentTodo}
                                    onEdit={handleEditTodo}
                                    onClose={() => setIsEditing(false)}
                                />
                            )}
                            {isDeleting && (
                                <Deletetodo
                                    onDelete={handleDeleteTodo}
                                    onCancel={() => setIsDeleting(false)}
                                />
                            )} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
