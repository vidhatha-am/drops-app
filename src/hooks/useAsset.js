import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import useClevertap from "./useClevertap";

const useAsset = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [claimState, setClaimState] = useState("claim");
  const [userCreated, setUserCreated] = useState(false);
  const [collectibleId, setCollectibleId] = useState("");
  const [userId, setUserId] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userCollectibles, setUserCollectibles] = useState([]);
  const [minted, setMinted] = useState(false);

  // const { onUserLogin, handleEventPushClick } = useClevertap();

  useEffect(() => {
    const auth = getAuth();
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user)
        setUserData(user);
        user.getIdToken().then((token) => {
          setAccessToken(token);
        });
      } else {
        setAccessToken(null);
      }
    });

    return () => unsubscribe(); // Cleanup the event listener on unmount
  }, []);

  function googleLogout() {
    const auth = getAuth();

    // Sign out the currently authenticated user
    auth
      .signOut()
      .then(() => {
        setAccessToken("");
        console.log("Successfully logged out");
        window.location.href = "/"; // Reload to the main domain
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }

  const getCollectiblesForUser = async () => {
    if (accessToken && accessToken.length > 0) {
        try {
          const response = await axios.get(
            "https://users.asset.money/api/v1/collectible/?type=user&page=1&perPage=50",
            {
              headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
              },
            }
          );
          if (response && response.data) {
            let responseData = response.data;
            console.log(responseData.data);
            if (responseData && responseData.data) {
              setUserCollectibles(responseData.data.data);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
  }

  //mint related funtions
  const getUser = async () => {
    if (accessToken && accessToken.length > 0) {
      setClaimState("claiming");
      try {
        const response = await axios.get(
          "https://users.asset.money/api/v1/user/profile",
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response && response.data) {
          setUserCreated(true);
          // createCollectible();
        }
        // return response.data;
      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 401) {
          // Call the createUser function here
          await createUser();
        } else {
          console.log(error);
        }
      }
    } else {
      console.log("no access token");
    }
  };

  const generateUsername = (username, uuid) => {
    // Remove spaces and special characters from the username
    const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, "");

    // Get the last three characters of the uuid
    const lastThreeCharacters = uuid.slice(-3);

    const modifiedUsername = cleanUsername + lastThreeCharacters;

    return modifiedUsername;
  };

  const mintCollectible = async () => {
    console.log("inside mint collectible");
    if (accessToken.length > 0 && collectibleId && collectibleId.length > 0) {
      try {
        const response = await axios.put(
          "https://users.asset.money/api/v1/collectible",

          null,
          {
            params: {
              collectibleID: `${collectibleId}`,
              // collectibleID:'f83ffb30-2148-451f-8d05-9dc4accc0013'
            },
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        if (response && response.data) {
          setClaimState("claimed");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no access token");
    }
  };

  const createCollectible = async () => {
    console.log("inside create collectible");
    if (accessToken && accessToken.length > 0) {
      try {
        const response = await axios.post(
          "https://users.asset.money/api/v1/collectible",
          {
            collectibletype: "drops",
          },
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setCollectibleId(response.data.data.CollectibleId);
        setClaimState("claimed")

      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          setCollectibleId(error.response.data.data.CollectibleId);
          // Call the createUser function here
          setClaimState("viewCollectible");
        } else {
          console.log(error);
        }
      }
    }
  };

  const createUser = async () => {
    console.log("inside create user");
    //write a condition to ensure there is no user with same username
    const firebaseUser = getAuth().currentUser;
    if (firebaseUser !== null) {
      const username = generateUsername(
        firebaseUser.displayName,
        firebaseUser.uid
      );
      if (username && username !== null) {
        const response = axios
          .post(
            "https://users.asset.money/api/v1/user/profile",
            {
              uuid: firebaseUser.uid,
              email: firebaseUser.email,
              firstname: firebaseUser.displayName,
              // username: firebaseUser.displayName,
              username: username,
              profilepic: firebaseUser.photoURL,
              mobile:
                firebaseUser.phoneNumber !== null
                  ? parseInt(firebaseUser.phoneNumber)
                  : null,
            },
            {
              headers: {
                Authorization: `${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // createCollectible();
            setUserCreated(true);
            console.log("USER ", firebaseUser)
            onUserLogin({
              "Site": {
                "Name": firebaseUser.displayName, // String
                "Identity": firebaseUser.uid, // String or number
                "Email": firebaseUser.email, // Email address of the user
                "Product": "Drops",
                "Total Claimed": 0
              },
            });

            handleEventPushClick("Account Created", {
              "Product name": "Drops",
              "Date": new Date(),
              "User": firebaseUser.displayName,
              "Email": firebaseUser.email,
              "Identity": firebaseUser.uid
            })
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const getMintStatus = async () => {
    console.log("user id", userId);
    if (accessToken && accessToken.length > 0 && userId) {
      try {
        const response = await axios.get(
          `https://users.asset.money/api/v1/collectible?type=user&uuid=${userId}`,
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        if (response && response.data) {
          let res = response.data.data.data;
          const matchingObjects = res.filter(
            (obj) => obj.CollectionSlug === "asset-tic-tac-toe"
          );
          if (matchingObjects.length > 0) {
            console.log(matchingObjects);
            setMinted(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    accessToken,
    setAccessToken,
    claimState,
    setClaimState,
    mintCollectible,
    userCreated,
    setUserCreated,
    collectibleId,
    setCollectibleId,
    createUser,
    getUser,
    createCollectible,
    userId,
    setUserId,
    photoUrl,
    setPhotoUrl,
    userData,
    userCollectibles,
    getCollectiblesForUser,
    googleLogout,
    getMintStatus,
    minted,
  };
};
export default useAsset;