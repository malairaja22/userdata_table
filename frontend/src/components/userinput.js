import { useState, useEffect } from "react"
import axios from 'axios'

export const Userinput = () => {

    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [uploadimage, setUploadimage] = useState('');
    const [loading,setLoading]=useState(false);


    const userdetailssend = async (e) => {
        e.preventDefault();
        if (fullname && gender && age && email && address && mobilenumber && uploadimage) {


            const formData = new FormData();
            const imagefile = document.getElementById('choosefile').files[0];
            formData.append("uploadimage", imagefile);
            formData.append("fullname", fullname);
            formData.append("gender", gender);
            formData.append("age", age);
            formData.append("email", email);
            formData.append("address", address);
            formData.append("mobilenumber", mobilenumber);
            setLoading(true);

            await axios.post(`${process.env.REACT_APP_URL}/adduserdetail`, formData)
                .then((res) => {
                    console.log(res.data);
                    if(res.data === 'success'){
                        setFullname('');
                        setGender('');
                        setAge('');
                        setEmail('');
                        setAddress('');
                        setMobilenumber('');
                        setUploadimage('');
                        document.getElementById('choosefile').value='';
                        alert("Data added successfully");
                        setLoading(false);
                    }else{
                        alert(res.data);
                        setLoading(false);
                    }
                }).catch((err) => {
                    console.log(err);
                })

        }else{
            alert("Fill all Data");
        }
    }

    const choosefile = () => {

        const imagefile = document.getElementById('choosefile').files[0];


        console.log(imagefile);
        if (imagefile) {
            setUploadimage(window.URL.createObjectURL(imagefile));
        }

    }


    return <>
        <div className="container">
            <h1>Form</h1>
            <form className="formcontainer">
                <div className="content">
                    <label>Full Name:</label>
                    <input type="text" className="inputbox" value={fullname} onChange={(e) => setFullname(e.target.value)}></input>
                </div>
                <div className="content">

                    <label name="gender">Gender:</label>

                    <div className="gendercontainer">
                        <div className="genderchoose">

                            <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)}></input>
                            <label htmlFor="male" >Male</label>
                        </div>
                        <div className="genderchoose">
                            <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)}></input>
                            <label htmlFor="female" >Female</label>
                        </div>
                        <div className="genderchoose">
                            <input type="radio" name="gender" value="others" onChange={(e) => setGender(e.target.value)}></input>
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
                    <textarea className="inputbox" value={address} onChange={(e) => setAddress(e.target.value)} ></textarea>
                </div>
                <div className="content">
                    <label>Upload image</label>
                    <input type='file' id='choosefile' accept='image/*' onChange={choosefile} ></input>

                    {(uploadimage) &&
                        <img src={uploadimage} alt='1' width="150px" />
                    }
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
                    <button className="btn" onClick={userdetailssend}>Submit</button>
                }
                
                {(loading) &&
                    <button className="btn button-disable" disabled>Loading...</button>
                }
                
            </form>
        </div>
    </>
}