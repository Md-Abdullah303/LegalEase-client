import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold">Page Not Found</h2>

        <p className="mt-4 text-muted-foreground">
          {`Sorry, the page you are looking for doesn't exist, has been moved, or
          is temporarily unavailable.`}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/lawyers">Browse Lawyers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
