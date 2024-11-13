<template>
  <div>
    <!-- Textarea để dán HTML trực tiếp -->
    <textarea v-model="htmlInput" placeholder="Paste HTML here"></textarea>

    <!-- Nút chọn file để upload file HTML -->
    <input type="file" @change="handleFileUpload" accept=".html" />

    <!-- Nút chuyển đổi và link tải CSV -->
    <button @click="convertHtmlToCsv">Convert to CSV</button>
    <a :href="csvData" download="data.csv" v-if="csvData">Download CSV</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlInput: '', // nơi lưu mã HTML nhập trực tiếp hoặc từ file
      csvData: null, // nơi lưu kết quả CSV
    };
  },
  methods: {
    // Hàm xử lý khi người dùng upload file HTML
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === 'text/html') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.htmlInput = e.target.result; // Lưu nội dung file vào htmlInput
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a valid HTML file.');
      }
    },
    // Hàm chuyển đổi HTML sang CSV
    convertHtmlToCsv() {
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.htmlInput, 'text/html');
      const rows = doc.querySelectorAll('table tr');

      let csvContent = '';
      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const rowData = Array.from(cells).map(cell => `"${cell.textContent.trim()}"`).join(',');
        csvContent += rowData + '\n';
      });

      const blob = new Blob([csvContent], { type: 'text/csv' });
      this.csvData = URL.createObjectURL(blob);
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}
</style>
