declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;
  export { ReactComponent };
  export default content;
}
