BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[BotInteraction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [confidenceLevels] NVARCHAR(1000) NOT NULL,
    [timeAvailability] NVARCHAR(1000) NOT NULL,
    [addiction] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BotInteraction_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BotInteraction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Goal] (
    [id] INT NOT NULL IDENTITY(1,1),
    [botInteractionId] INT NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Goal_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SocialLifeCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [botInteractionId] INT NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SocialLifeCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[BotInteraction] ADD CONSTRAINT [BotInteraction_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Goal] ADD CONSTRAINT [Goal_botInteractionId_fkey] FOREIGN KEY ([botInteractionId]) REFERENCES [dbo].[BotInteraction]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SocialLifeCategory] ADD CONSTRAINT [SocialLifeCategory_botInteractionId_fkey] FOREIGN KEY ([botInteractionId]) REFERENCES [dbo].[BotInteraction]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
