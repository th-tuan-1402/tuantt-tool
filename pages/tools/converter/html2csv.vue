<template>
  <div>
    <!-- Textarea để nhập hoặc dán HTML trực tiếp -->
    <textarea v-model="htmlInput" placeholder="Paste HTML here"></textarea>

    <!-- Nút chọn file để upload file HTML -->
    <input type="file" @change="handleFileUpload" accept=".html" />

    <!-- Nút chuyển đổi và link tải CSV -->
    <button @click="convertHtmlToCsv">Convert to CSV</button>
    <a :href="csvData" download="data.csv" v-if="csvData">Download CSV</a>

    <!-- Phần hiển thị preview HTML đã nhập hoặc tải lên -->
    <div v-if="htmlInput" class="preview-container">
      <h3>HTML Preview</h3>
      <div v-html="htmlInput" class="html-preview"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlInput: '', // Nơi lưu mã HTML nhập trực tiếp hoặc từ file
      csvData: null, // Nơi lưu kết quả CSV
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
.preview-container {
  margin-top: 20px;
}
.html-preview {
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}
</style>
