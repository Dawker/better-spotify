import React from 'react'

export default function TrackResults({ track, choosedTrack }) {

  function playTrack(track) {
    choosedTrack(track);
  }

  return (
    <div className="d-flex m-2 align-items-center" onClick={() => playTrack(track)} style={{ cursor: 'pointer' }}>
      <img src={track.albumImg} alt="track img" style={{ height: 64, width: 64 }} />
      <div style={{ marginLeft: 10 }}>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}

