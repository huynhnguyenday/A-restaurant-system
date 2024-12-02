import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {
  // Tạo token với payload là id
  const token = jwt.sign(
    { id }, // Payload
    process.env.JWT_SECRET, // Secret key dùng để ký token
    { expiresIn: '7d' } // Thời hạn token
  );

  // Gửi token dưới dạng cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Chỉ có thể truy cập bằng HTTP (bảo vệ khỏi XSS)
    secure: process.env.NODE_ENV === 'production', // Bảo mật hơn khi chạy production
    sameSite: 'strict', // Chặn cookie gửi từ các domain khác
    maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống của cookie (7 ngày)
  });
};

export default generateToken;