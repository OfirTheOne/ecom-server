export const sleep = (delay: number) => new Promise<any>((resolve, reject) => {
    const timer = setTimeout(
        () => {
            clearTimeout(timer)
            resolve()
        },
        delay
    )
}) 