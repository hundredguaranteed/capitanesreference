# Capitanes Reference

Standalone static site for the 2025-26 RealGM international player sample.

## Run locally

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/`.

## Notes

- Player names link out to the RealGM summary page.
- The default table excludes RealGM IDs, raw links, page number, and position.
- `PRPG!` follows Bart Torvik's 2019 formula with neutral opponent adjustment because this RealGM export does not include opponent average defensive efficiency.
