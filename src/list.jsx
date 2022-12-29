import React from "react";
import {FaEdit,FaTrash} from 'react-icons/fa'

const List = ({list,removeItem,editItem}) => {
    return (
        <div className="grocery-list">
            {
                list.map((item) => {
                    const {id,title} = item
                    return (
                        <article className="grocery-item" key={id}>
                            <p>{title}</p>
                            <div className="btn-container">
                                <button 
                                    className="edit-btn" 
                                    onClick={() => editItem(id)} 
                                    type='button' 
                                    ><FaEdit />
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => removeItem(id)} 
                                    type='button' >
                                    <FaTrash />
                                </button>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}
export default List ;