export default function avoidTooManyRequestsError(delay = 100) {
  if (!process.env.IS_BUILD) {
    return;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
