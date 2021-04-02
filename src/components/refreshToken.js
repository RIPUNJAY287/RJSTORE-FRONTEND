import axios from "axios";
const apikey = process.env.REACT_APP_FIREBASE_API_KEY;
async function refreshToken(tok, uid) {
  console.log(typeof uid);
  await axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apikey}`,
      {
        token: tok,
        returnSecureToken: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return;
}
export default refreshToken;
