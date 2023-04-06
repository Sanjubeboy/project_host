import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const Updatestory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      
      const q =
      "SELECT * FROM stories WHERE userId = ?";


      db.query(q, [userInfo.id], (err, data) => {

        if (err) 
        {
          return res.status(500).json(err);  
        }

        if (data.length)
        {
          const q =
            "UPDATE stories SET `img`=? WHERE `userId` = ?";

        
            db.query(
              q,
              [req.body.status, 
                userInfo.id],
              (err, data) => {
                if (err) res.status(500).json(err);
                return res.status(403).json("Story Updated");
              }
            );
        }
        else
        {
          const q =
          "INSERT INTO stories (`img`,`userId`) VALUES (?)";
    
          const values = [
            req.body.status, 
            userInfo.id,
          ];
      
          db.query(
            q,
            [values],
            (err, data) => {
              if (err) res.status(500).json(err);
              if (data.affectedRows > 0) return res.json("Story Added!");
              return res.status(403).json("You can add only your story!");
            }
          );
        }

      });


   
});
};