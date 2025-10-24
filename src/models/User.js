import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "../config.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Användarnamn krävs"],
      unique: true,
      trim: true,
      minlength: [3, "Användarnamn måste vara minst 3 tecken"],
      maxlength: [30, "Användarnamn får vara max 30 tecken"],
    },
    email: {
      type: String,
      required: [true, "E-post krävs"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Ogiltig e-postadress",
      ],
    },
    password: {
      type: String,
      required: [true, "Lösenord krävs"],
      minlength: [6, "Lösenord måste vara minst 6 tecken"],
    },
  },
  {
    timestamps: true, //lägger till createdAt och updatedAt automatiskt
  }
);

// Hasha lösenord innan sparning
userSchema.pre("save", async function (next) {
  // Om lösenordet inte har ändrats, hoppa över
  if (!this.isModified("password")) return next();

  try {
    // Hasha lösenordet med konfigurerbara salt rounds
    const salt = await bcrypt.genSalt(config.bcryptRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// metod för att jämföra lösenord
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ta bort lösenord från JSON-utdata
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model("User", userSchema);
