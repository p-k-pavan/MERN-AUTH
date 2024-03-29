import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [imagePercent,setImagePercent]=useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleImageFile(image);
    }
  }, [image]);

  const handleImageFile = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImagePercent(Math.round(progress));
        console.log(progress)
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div>
      <h1 className="text-center my-8 text-3xl font-semibold ">Profile</h1>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <form className="flex flex-col m-auto max-w-lg gap-4">
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          className="rounded-full w-24 h-24 self-center cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
         <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>

        <input
          type="text"
          placeholder="UserName"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="password"
        />
        <button className="bg-slate-600 text-white font-semibold p-3 rounded-lg hover:bg-slate-500">
          UPDATE
        </button>
      </form>
      <div className="flex m-auto justify-center max-w-lg justify-between my-4">
        <span className="hover:text-red-600 font-semibold cursor-pointer">
          Delete Account
        </span>
        <span className="hover:text-red-600 font-semibold cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
