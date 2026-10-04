// ===== 1. Lấy các phần tử trên trang để điều khiển =====
// document.querySelector tìm phần tử theo tên class (dấu chấm ở đầu là cú pháp của class)
const chatBox = document.querySelector(".chat");
const input = document.querySelector(".composer__input");
const sendButton = document.querySelector(".composer__send");

// ===== 2. Hàm thêm một tin nhắn vào khung chat =====
// sender: "user" hoặc "ai"  |  text: nội dung tin nhắn
function addMessage(sender, text) {
  const bubble = document.createElement("div");   // tạo một thẻ <div> mới
  bubble.className = "message message--" + sender; // gắn class để CSS tô màu và căn lề
  bubble.textContent = text;                       // gán nội dung (an toàn, xem ghi chú bên dưới)
  chatBox.appendChild(bubble);                     // gắn vào cuối khung chat
  chatBox.scrollTop = chatBox.scrollHeight;        // tự cuộn xuống tin mới nhất
}

// ===== 3. Hàm xử lý khi người dùng gửi tin =====
function handleSend() {
  const text = input.value.trim(); // lấy chữ đã gõ, bỏ khoảng trắng thừa hai đầu
  if (text === "") return;         // ô trống thì không làm gì

  addMessage("user", text);        // hiện tin của bạn
  input.value = "";                // xóa ô nhập
  input.focus();                   // đưa con trỏ về ô nhập để gõ tiếp

  // Tạm thời: AI trả lời giả. Bước sau sẽ thay dòng này bằng AI thật.
  addMessage("ai", "(AI giả lập) Mình đã nhận: " + text);
}

// ===== 4. Gắn sự kiện: khi nào thì chạy handleSend =====
// Bấm nút Gửi
sendButton.addEventListener("click", handleSend);

// Nhấn Enter để gửi, Shift + Enter để xuống dòng
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // chặn hành vi mặc định (xuống dòng)
    handleSend();
  }
});
