<template>
  <div class="stack-queue-container">
    <h2>Stack & Queue</h2>

    <!-- Controls -->
    <div class="controls">
      <input v-model="newItem" placeholder="Enter item" class="input-item" />
      <button @click="pushItem" class="btn">Push to Stack & Queue</button>
      <button @click="popItem" class="btn">Pop from Stack & Queue</button>
    </div>

    <!-- Stack and Queue -->
    <div class="stack-queue-row">
      <!-- Stack -->
      <div class="stack-queue">
        <h3>Stack</h3>
        <div class="stack">
          <div v-for="(item, index) in stack" :key="index" class="stack-item">{{ item }}</div>
        </div>
      </div>

      <!-- Queue -->
      <div class="stack-queue">
        <h3>Queue</h3>
        <div class="queue">
          <div v-for="(item, index) in queue" :key="index" class="queue-item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stack: [],
      queue: [],
      newItem: ''
    };
  },
  methods: {
    pushItem() {
      if (this.newItem) {
        this.stack.push(this.newItem);
        this.queue.push(this.newItem);
        this.newItem = '';
      }
    },
    popItem() {
      if (this.stack.length > 0) {
        this.stack.pop();
      }
      if (this.queue.length > 0) {
        this.queue.shift();
      }
    }
  }
};
</script>

<style scoped>
.stack-queue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls {
  margin-bottom: 20px;
}

.input-item {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.stack-queue-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px; /* Adjust the gap as needed */
  width: 100%;
}

.stack-queue {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.stack {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.queue {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stack-item, .queue-item {
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}
</style>