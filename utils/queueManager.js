let queue = [];

function addToQueue(job) {
  queue.push({ ...job, time: Date.now() });
}

function getNextJob() {
  if (queue.length === 0) return null;

  const priorityValue = { HIGH: 3, MEDIUM: 2, LOW: 1 };

  queue.sort((a, b) => {
    const priorityDiff = priorityValue[b.priority] - priorityValue[a.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    return a.time - b.time;
  });

  return queue.shift();
}

module.exports = { addToQueue, getNextJob };
