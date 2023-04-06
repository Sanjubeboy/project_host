import { useState } from "react";
import { makeRequest } from "../../axios";
import "./Updatestory.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Updatestory = ({ setOpenUpdate, user }) => {
    const [status, setstatus] = useState(null);
    
    const temp = JSON.parse(localStorage.getItem("user"));
    const default_img = temp.profilePic;
    // const user_id = temp.id;
  
    const upload = async (file) => {
      console.log(file)
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await makeRequest.post("/upload", formData);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  
    const queryClient = useQueryClient();
  
    const mutation = useMutation(
        (status) => {
          return makeRequest.post("/Updatestory", status);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["Updatestory"]);
       },
    }
    );
    const handleClick = async (e) => {
      e.preventDefault();
  
      //TODO: find a better way to get image URL
      
    //   let coverUrl;
    //   let profileUrl;
    //   coverUrl = cover ? await upload(cover) : user.coverPic;
    //   profileUrl = profile ? await upload(profile) : user.profilePic;

    let statusUrl;
    statusUrl = status ? await upload(status) : default_img;
      
      mutation.mutate({status: statusUrl});
      setOpenUpdate(false);
      setstatus(null);
    //   setProfile(null);
    };
  
    return (
      <div className="update">
        <div className="wrapper">
          <h1>Update Your Status</h1>
          <form>
            <div className="files">
              
              <label htmlFor="status">
                <span>Status picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      status
                        ? URL.createObjectURL(status)
                        : "/upload/" + default_img
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="status"
                style={{ display: "none" }}
                onChange={(e) => setstatus(e.target.files[0])}
              />
            </div>
            
            <button onClick={handleClick}>Update status</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            close
          </button>
        </div>
      </div>
    );
  // };
  
  };
  
  export default Updatestory;