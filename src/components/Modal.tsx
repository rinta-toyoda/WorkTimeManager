import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: (title: string) => void;
}) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => onClose("")}
      />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -30 },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        open
        className="fixed bg-white top-[30%] p-6 rounded-lg shadow-lg z-50 w-[90%] max-w-md"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!,
  );
}
