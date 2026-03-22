# Language Learning Platform

## Giới thiệu

Trong bối cảnh hội nhập toàn cầu ngày càng sâu rộng, ngoại ngữ — đặc biệt là tiếng Anh — đã trở thành kỹ năng thiết yếu trong học tập, công việc và cuộc sống hàng ngày. Nhu cầu học ngoại ngữ vì thế ngày càng tăng cao, kéo theo sự bùng nổ của các ứng dụng và nền tảng học trực tuyến. Tuy nhiên, phần lớn các công cụ hiện có hoặc quá phức tạp, hoặc thiếu tính cá nhân hóa, hoặc không đủ yếu tố tạo động lực để người học duy trì thói quen lâu dài.

Xuất phát từ thực tế đó, **WinLex** được xây dựng nhằm cung cấp một môi trường học từ vựng tiếng Anh đơn giản, trực quan và hiệu quả. Nền tảng này giúp người học ôn luyện từ vựng mỗi ngày thông qua flashcard và các bài kiểm tra nhanh, đồng thời tích hợp các tính năng học phát âm, tra từ điển và học ngữ pháp để đảm bảo trải nghiệm học tập toàn diện. Bên cạnh đó, hệ thống theo dõi streak, biểu đồ tiến độ và bảng xếp hạng được tích hợp nhằm tạo động lực và giúp người dùng duy trì thói quen học tập đều đặn mỗi ngày.

---

## Mô tả bài toán

Việc học từ vựng ngoại ngữ không chỉ đòi hỏi sự kiên trì mà còn cần phương pháp phù hợp và môi trường học tập có tính tương tác cao. Trên thực tế, nhiều người học gặp phải những khó khăn phổ biến như: dễ quên những từ đã học trước đó, thiếu động lực để duy trì việc học hàng ngày, và không có cách nào để tự đánh giá tiến độ của bản thân một cách rõ ràng.

**WinLex** được xây dựng để giải quyết những vấn đề đó. Hệ thống tập trung vào việc giúp người học tiếp cận từ vựng theo nhiều hình thức khác nhau — học qua flashcard, kiểm tra qua quiz, luyện phát âm, tra từ điển và học ngữ pháp — tất cả trong một giao diện thống nhất, dễ sử dụng. Đồng thời, các cơ chế như streak, điểm số và bảng xếp hạng được tích hợp để biến việc học hàng ngày trở thành một thói quen thú vị và có mục tiêu.

---

## Đối tượng người dùng

Hệ thống phục vụ hai nhóm người dùng chính:

**User (Người học)** là đối tượng trung tâm của nền tảng. Người học có thể tạo tài khoản, truy cập các bài học từ vựng, luyện phát âm, làm quiz, tra từ điển, theo dõi tiến độ cá nhân và tham gia bảng xếp hạng cộng đồng.

**Admin (Quản trị viên)** chịu trách nhiệm quản lý nội dung của hệ thống, bao gồm việc thêm, chỉnh sửa và xóa từ vựng, bài học ngữ pháp, cũng như quản lý tài khoản người dùng và theo dõi hoạt động toàn hệ thống.

---

## Chức năng chính

### 1. Học từ vựng bằng Flashcard
Người học được tiếp cận từ vựng thông qua các thẻ flashcard trực quan. Mỗi thẻ hiển thị từ tiếng Anh ở mặt trước; người học có thể lật thẻ để xem nghĩa tiếng Việt, ví dụ minh họa và nghe phát âm chuẩn (giọng Anh-Anh hoặc Anh-Mỹ tùy lựa chọn). Phương pháp này giúp người học ghi nhớ từ vựng theo ngữ cảnh thay vì học thuộc lòng đơn thuần.

### 2. Quiz kiểm tra từ vựng
Sau mỗi phiên học flashcard, người dùng có thể kiểm tra mức độ ghi nhớ thông qua các bài quiz trắc nghiệm. Hệ thống hỗ trợ nhiều dạng câu hỏi, bao gồm chọn nghĩa đúng của từ, điền từ vào chỗ trống và dạng nghe — chọn từ tương ứng. Kết quả được hiển thị ngay sau mỗi bài, kèm theo phân tích từ nào người dùng trả lời sai để ôn lại.

### 3. Học phát âm / Bảng IPA
Người học có thể tra cứu và luyện tập phát âm thông qua bảng ký hiệu phiên âm quốc tế (IPA). Mỗi ký hiệu đi kèm với âm thanh mẫu, giúp người học làm quen với cách đọc chuẩn. Tính năng này cũng được tích hợp trực tiếp vào flashcard và từ điển, đảm bảo người học tiếp xúc với phát âm trong suốt quá trình học.

### 4. Tra từ điển
Hệ thống cung cấp tính năng tra từ điển tích hợp, cho phép người dùng tìm kiếm nghĩa, ví dụ sử dụng và phát âm của bất kỳ từ nào. Dữ liệu từ điển được lấy từ cơ sở dữ liệu nội bộ kết hợp với API từ điển bên ngoài. Sau khi tra xong, người dùng có thể lưu từ vào danh sách yêu thích hoặc thêm thẳng vào bộ flashcard để ôn luyện, tạo ra vòng học khép kín tự nhiên.

### 5. Học ngữ pháp
Ngoài từ vựng, nền tảng cũng cung cấp các bài học ngữ pháp tiếng Anh cơ bản đến nâng cao, được trình bày ngắn gọn, có ví dụ minh họa cụ thể. Người dùng có thể học ngữ pháp song song với từ vựng, giúp củng cố khả năng sử dụng ngôn ngữ trong thực tế.

### 6. Thêm từ vựng yêu thích
Người học có thể đánh dấu và lưu lại những từ họ muốn ghi nhớ đặc biệt. Danh sách từ yêu thích có thể được dùng để tạo bộ flashcard riêng hoặc ôn luyện độc lập, giúp cá nhân hóa trải nghiệm học tập theo nhu cầu của từng người.

### 7. Theo dõi Streak (chuỗi ngày học liên tiếp)
Hệ thống ghi nhận và hiển thị số ngày học liên tiếp của người dùng. Streak bị reset nếu người dùng bỏ qua một ngày mà không hoàn thành bất kỳ hoạt động học nào. Cơ chế này tạo ra áp lực tích cực, khuyến khích người học duy trì thói quen học tập đều đặn mỗi ngày.

### 8. Thống kê & Biểu đồ tiến độ học tập
Người dùng có thể xem thống kê học tập chi tiết bao gồm: tổng số từ đã học, số bài quiz đã hoàn thành, tỷ lệ câu trả lời đúng/sai và thời gian học tích lũy. Bên cạnh đó, biểu đồ tiến độ theo ngày, tuần hoặc tháng giúp người học dễ dàng nhận ra xu hướng học tập của mình và điều chỉnh kế hoạch phù hợp.

### 9. Bảng xếp hạng
Người học được xếp hạng dựa trên điểm số tích lũy từ các bài quiz và số ngày streak duy trì được. Bảng xếp hạng cộng đồng tạo ra môi trường cạnh tranh lành mạnh, vừa là nguồn động lực, vừa là nơi người học có thể so sánh tiến độ với những người dùng khác trong cộng đồng.

---

## Mục tiêu của dự án

Dự án hướng đến việc xây dựng một nền tảng học tiếng Anh toàn diện nhưng vẫn giữ được sự đơn giản và dễ tiếp cận. Cụ thể:

- Giúp người học cải thiện vốn từ vựng thông qua phương pháp học lặp lại có hệ thống kết hợp với kiểm tra định kỳ.
- Cung cấp đầy đủ các kỹ năng bổ trợ (phát âm, ngữ pháp, tra từ điển) trong cùng một nền tảng, giảm thiểu việc người học phải chuyển đổi qua lại giữa nhiều ứng dụng khác nhau.
- Tạo động lực học tập bền vững thông qua các cơ chế gamification như streak, điểm số và bảng xếp hạng.
- Cung cấp dữ liệu học tập minh bạch để người học tự đánh giá và điều chỉnh kế hoạch học tập của mình.
