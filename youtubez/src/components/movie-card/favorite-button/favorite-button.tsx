import React from 'react';

interface FavoriteButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    externalClassName: string;
    icon: React.ReactNode
}

function FavoriteButton(props: FavoriteButtonProps) {
    return (
                <button
                    key={props.externalClassName}
                    className={props.externalClassName}
                    onClick={(e) => props.onClick(e)}>
                    {props.icon}
                </button>
    );
}

export default FavoriteButton;