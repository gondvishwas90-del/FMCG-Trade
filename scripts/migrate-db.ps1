$ATLAS_URI = "mongodb+srv://avhadenterprisespc2_db_user:dT4FUSCRYnCXRlJu@cluster0.j4eiepn.mongodb.net/?appName=Cluster0"
$LOCAL_CONTAINER = "mongodb_fmcg"
$BACKUP_FILE = "mongodb_atlas_backup.gz"

Write-Host "Starting Docker containers..." -ForegroundColor Cyan
docker-compose up -d

Write-Host "Dumping from Atlas to local file ($BACKUP_FILE)..." -ForegroundColor Cyan
docker run --rm -v "${PWD}:/backup" mongo mongodump --uri="$ATLAS_URI" --archive=/backup/$BACKUP_FILE --gzip

if ($LASTEXITCODE -ne 0) {
    Write-Host "Dump failed! Please check your internet connection and Atlas URI." -ForegroundColor Red
    exit 1
}

Write-Host "Copying backup to container..." -ForegroundColor Cyan
docker cp $BACKUP_FILE "${LOCAL_CONTAINER}:/tmp/backup.gz"

Write-Host "Restoring to local MongoDB..." -ForegroundColor Cyan
docker exec -i $LOCAL_CONTAINER mongorestore --archive=/tmp/backup.gz --gzip --drop --username admin --password password --authenticationDatabase admin

if ($LASTEXITCODE -eq 0) {
    Write-Host "Migration completed successfully!" -ForegroundColor Green
    Write-Host "Mongo Express is available at: http://localhost:8081 (admin/password)" -ForegroundColor Gray
} else {
    Write-Host "Restore failed!" -ForegroundColor Red
}

# Clean up local file
if (Test-Path $BACKUP_FILE) {
    Remove-Item $BACKUP_FILE
}
