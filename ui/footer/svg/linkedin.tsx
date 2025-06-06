import type { SVGAttributes } from "react";

export const LinkedinIcon = ({
  ...svg
}: Omit<
  SVGAttributes<SVGSVGElement>,
  "xmlns" | "viewBox" | "fill" | "role"
>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M0 0V24H24V0H0ZM7.4649 19.9386H3.90414V9.22581H7.4649V19.9386ZM5.68452 7.76366H5.66099C4.46653 7.76366 3.69231 6.94075 3.69231 5.91218C3.69231 4.86103 4.48916 4.06143 5.70783 4.06143C6.92677 4.06143 7.67583 4.86103 7.69915 5.91218C7.69915 6.94075 6.92677 7.76366 5.68452 7.76366ZM20.3077 19.9386H16.746V14.2072C16.746 12.7677 16.2314 11.7851 14.9423 11.7851C13.9578 11.7851 13.3728 12.4467 13.1151 13.0875C13.0214 13.3165 12.9969 13.6347 12.9969 13.9557V19.9386H9.43453C9.43453 19.9386 9.48227 10.2309 9.43453 9.22586H12.9969V10.7439C13.4702 10.0156 14.3149 8.97437 16.2069 8.97437C18.5508 8.97437 20.3077 10.5051 20.3077 13.7954V19.9386Z"
    />
  </svg>
);

LinkedinIcon.displayName = "LinkedinIcon";
