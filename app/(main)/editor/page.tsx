import ClientOnly from "@/components/ClientOnly";
import { Editor } from "@/components/core/Editor";

export default function DashboardPage() {
  return (
    <>
      <div className="h-screen px-[5%] py-[5%] md:px-[10%] lg:px-[15%]">
        <ClientOnly>
          <Editor editable={true} />
        </ClientOnly>
      </div>
    </>
  );
}
