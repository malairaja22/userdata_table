import { useState, useEffect } from "react"
import axios from 'axios';

export const Userdetails = () => {

    const [userdetails, setUserdetails] = useState([]);

    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [userid, setUserid] = useState('');
    const [profilepic, setProfilepic] = useState('');
    const [uploadimage, setUploadimage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getuserdetails();
    }, [])


    const getuserdetails = async () => {
        setLoading(true)
        await axios.get(process.env.REACT_APP_URL)
            .then((res) => {
                setUserdetails(res.data);
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    const editclicked = (e) => {
        let result = userdetails.find((val) => val._id === e.target.value);
        if (result) {
            setFullname(result.fullname);
            setAge(result.age);
            setGender(result.gender);
            setEmail(result.email);
            setAddress(result.address);
            setMobilenumber(result.mobilenumber);
            setUserid(e.target.value);
            setProfilepic(result.profilepic);
            let a = document.getElementById('editformcontainer');
            a.style.left = "0";
        }
    }

    const editsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (uploadimage) {
            const imagefile = document.getElementById('choosefile1').files[0];
            formData.append("uploadimage", imagefile);
        }
        formData.append("imagename", profilepic);
        formData.append("fullname", fullname);
        formData.append("gender", gender);
        formData.append("age", age);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("mobilenumber", mobilenumber);
        formData.append("userid", userid);
        if (fullname && gender && age && email && address && mobilenumber) {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_URL}/edituserdetail`, formData)
                .then((res) => {
                    if (res.data === 'success') {
                        alert("Edit success");
                        closebuttonclick();
                        document.getElementById('choosefile1').value = '';
                        setUploadimage('');
                        getuserdetails();
                    } else {
                        alert(res.data);
                        setLoading(false)
                    }


                }).catch((err) => {
                    console.log(err);
                })
        } else {
            alert("Fill all Data");
        }
    }

    const deleteclicked = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure?')) {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_URL}/deleteuserdetail`, {
                userid: e.target.value
            })
                .then((res) => {
                    if (res.data === 'success') {
                        getuserdetails();
                    } else {
                        alert("error");
                        setLoading(false)
                    }
                }).catch((err) => {
                    console.log(err);
                    setLoading(false)
                })
        }
    }

    const choosefile = () => {

        const imagefile = document.getElementById('choosefile1').files[0];
        if (imagefile) {
            setUploadimage(window.URL.createObjectURL(imagefile));
        }

    }

    const closebuttonclick = () => {
        let a = document.getElementById('editformcontainer');
        a.style.left = "-200%";
    }


    return <>

        <h1>User Details</h1>

        <div className="outercontainer">
            <table >
                <tr>
                    <th>s.no</th>
                    <th>Full Name</th>
                    <th>picture</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>E-mail Id</th>
                    <th>Mobile No</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
{(!loading) && <>



                {
                    userdetails.map((val, i) => {
                        return <><tr key={val._id} className="tablecontainer">

                            <td> <p>{i + 1}</p></td>
                            <td>  <p>{val.fullname}</p></td>
                            <td>   <img src={`${process.env.REACT_APP_URL}/photos?source=${val.profilepic}`} width="50px" height='50px' alt="pic" /></td>
                            <td>  <p>{val.gender}</p></td>
                            <td>   <p>{val.age}</p></td>
                            <td>   <p>{val.address}</p></td>
                            <td>    <p>{val.email}</p></td>
                            <td> <p>{val.mobilenumber}</p></td>
                            <td>   <button id='editbutton' onClick={editclicked} value={val._id} ></button></td>
                            <td>  <button id="deletebutton" onClick={deleteclicked} value={val._id}></button></td>


                        </tr>
                        </>
                    })
                }
                </>
            }
            {(loading) &&

            <h1>Loading...</h1>

            }
            </table>
        </div>

        <div id="editformcontainer">
            <div id="editformtop">
                <h1>Edit Form</h1>
                <button id="closebutton" onClick={closebuttonclick}>X</button>
            </div>
            <form className="formcontainer">
                <div className="content">
                    <label>Full Name:</label>
                    <input type="text" className="inputbox" value={fullname} onChange={(e) => setFullname(e.target.value)}></input>
                </div>
                <div className="content">
                    <label name="gender">Gender:</label>
                    <div className="gendercontainer">
                        <div className="genderchoose">
                            <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} checked={true && (gender === 'male')} ></input>
                            <label htmlFor="male" >Male</label>
                        </div>
                        <div className="genderchoose">
                            <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} checked={true && (gender === 'female')}></input>
                            <label htmlFor="female" >Female</label>
                        </div>
                        <div className="genderchoose">
                            <input type="radio" name="gender" value="others" onChange={(e) => setGender(e.target.value)} checked={true && (gender === 'others')}></input>
                            <label htmlFor="others" >Others</label>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <label>Age:</label>
                    <input type="number" className="inputbox" value={age} onChange={(e) => setAge(e.target.value)}></input>
                </div>
                <div className="content">
                    <label>Address:</label>
                    <textarea value={address} className="inputbox" onChange={(e) => setAddress(e.target.value)} ></textarea>
                </div>
                <div className="content">
                    <label>Upload image</label>
                    <input type='file' id='choosefile1' accept='image/*' onChange={choosefile} ></input>


                    <img src={uploadimage} width="150px" alt='pic' />


                </div>
                <div className="content">
                    <label>Email:</label>
                    <input type="email" className="inputbox" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="content">
                    <label>Mobile No:</label>
                    <input type="number" className="inputbox" value={mobilenumber} onChange={(e) => setMobilenumber(e.target.value)}></input>
                </div>
               
                {(!loading) &&
                    <button className="btn" onClick={editsubmit}>Submit</button>
                }

                {(loading) &&
                    <button className="btn button-disable" disabled>Loading...</button>
                }
            </form>
        </div >

    </>
}