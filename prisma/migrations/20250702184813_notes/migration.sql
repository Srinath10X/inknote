-- CreateTable
CREATE TABLE "NoteNotes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "noteCtx" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoteNotes_pkey" PRIMARY KEY ("id")
);
