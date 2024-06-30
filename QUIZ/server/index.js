import  argon2  from 'argon2';
async function AB(){
    try {
        const hash = await argon2.hash("Chintu");
        console.log('password is ',hash);
        console.log('abhay');
      } catch (err) {
        //...
      }
}
AB()


async function A(){
    try {
        if (await argon2.verify("$argon2id$v=19$m=65536,t=3,p=4$q7Fx/pICjsfZq3KBTau38Q$RHNiARJsCwEpK0yR1Y4xNh1pn7070z4xoR79vp5Dt3I", "Chintu")) {
          // password match
          console.log('password matched');
        } else {
          // password did not match
          console.log('passwrod didnt match');
        }
      } catch (err) {
        // internal failure
      }
}

A()