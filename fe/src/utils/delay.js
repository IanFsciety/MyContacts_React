export default function Delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
