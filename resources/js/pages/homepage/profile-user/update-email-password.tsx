import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function UpdateEmailPassword() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !newPassword) {
      setStatusMessage("Isi email baru atau password baru untuk diperbarui.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await axios.post("/profile/send-update-otp", {
        email,
        current_password: currentPassword,
        new_password: newPassword,
      });

      if (response.data.success) {
        setIsVerifying(true);
        setStatusMessage("Kode OTP telah dikirim ke email Anda. Silakan masukkan kode verifikasi.");
      } else {
        setStatusMessage(response.data.message || "Gagal mengirim OTP.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Terjadi kesalahan saat mengirim OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!verificationCode) {
      setStatusMessage("Masukkan kode OTP terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await axios.post("/profile/verify-update-otp", {
        email,
        otp: verificationCode,
        new_password: newPassword,
      });

      if (response.data.success) {
        // ✅ Tampilkan SweetAlert sukses
        await Swal.fire({
          title: "Data Berhasil Diperbarui!",
          text: "Perubahan email atau password Anda telah disimpan.",
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          confirmButtonText: "OK",
        });

        // 🔁 Redirect ke halaman profil
        window.location.href = "/profile";

        resetForm();
      } else {
        setStatusMessage(response.data.message || "❌ Kode OTP salah atau sudah kedaluwarsa.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Terjadi kesalahan saat verifikasi OTP.");
    } finally {
      setIsSubmitting(false);
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setVerificationCode("");
    setIsVerifying(false);
  };

  return (
    <form onSubmit={handleSendOtp} className="space-y-5">
      {!isVerifying ? (
        <>
          {/* Email Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Baru</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring focus:ring-purple-400 focus:ring-opacity-30"
              placeholder="Masukkan email baru (opsional)"
            />
          </div>

          {/* Password Lama */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Saat Ini</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring focus:ring-purple-400 focus:ring-opacity-30"
            />
          </div>

          {/* Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring focus:ring-purple-400 focus:ring-opacity-30"
              placeholder="Masukkan password baru"
            />
          </div>

          {statusMessage && <p className="text-sm text-green-600">{statusMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-purple-400 px-4 py-2 font-semibold text-black shadow hover:bg-purple-500"
          >
            {isSubmitting ? "Mengirim OTP..." : "Kirim OTP"}
          </button>
        </>
      ) : (
        <>
          {/* Input OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kode OTP</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring focus:ring-purple-400 focus:ring-opacity-30"
              placeholder="Masukkan kode OTP"
            />
          </div>

          {statusMessage && <p className="text-sm text-green-600">{statusMessage}</p>}

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={isSubmitting}
            className="w-full rounded-lg bg-purple-400 px-4 py-2 font-semibold text-black shadow hover:bg-purple-500"
          >
            {isSubmitting ? "Memverifikasi..." : "Verifikasi OTP"}
          </button>
        </>
      )}
    </form>
  );
}
