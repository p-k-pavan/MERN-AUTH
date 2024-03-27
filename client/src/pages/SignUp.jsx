import{ useState }from "react";
import { Link,  useNavigate } from "react-router-dom";


export default function SignUp() {
const [formData, setFormData]= useState({});
const [error,setError]=useState(null);
const [loading,setLoading]=useState(false);
const navigate = useNavigate();
const handleChange = (e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
}
const handleSubmit = async(e)=>{
   e.preventDefault();
   try{
    setLoading(true)
    
    const res = await fetch("/api/auth/signup",
    {
       method:"POST",
       headers:{
         'Content-Type':'application/json'
       },
       body:JSON.stringify(formData),

    });
    const data =await res.json();
    
    setLoading(false);
    if(data.success===false){
      setError(true)
      return;
    }
    
  navigate("/sign-in")
   }catch(err){
    setLoading(false);
    setError(true)
   }
}

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">SIGN UP</h1>
      <form className="flex flex-col max-w-lg mx-auto gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="UserName"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-600 text-white font-semibold p-3 rounded-lg hover:bg-slate-500">
          {loading? "Loading...":"SIGNUP"}
        </button>
      </form>
      <p className="text-center my-7 font-semibold">
        {" "}
        Alredy have accout?{" "}
        <Link to="/sign-in" className="text-blue-500">
          Sign-In
        </Link>
      </p>

      <p className="text-red-500 text-center">{error && "something went worng"}</p>
    </div>
  );
}

