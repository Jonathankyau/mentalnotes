import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default:
          "https://cdn-icons-png.flaticon.com/512/1160/1160428.png?w=826&t=st=1670534353~exp=1670534953~hmac=11b2f5641c175a26f865c794e42362b4a0e4fda74b4ef2dff4e94aef9eab8095",
      },
    },
    { timestamps: true }
  );
  

const User = new mongoose.model('User', UserSchema);

export default User;
