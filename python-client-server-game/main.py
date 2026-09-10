import manager_game


# בפרוייקט התחברתי למסד מסוג MONGODB
# לצורך כך התקנתי את הספריות pymongo
# bson (כדי שאוכל להסתדר עם ההמאפיין _ID של מונגו)
# בגדול כל ניהול המששחק בקובץ MANGER_GAME
# הערה: לכאורה לא הייתי צריכה לבנות מחלקת USER, אבל בניתי אותה בהתאם לדרישות
# יתכן שבגללה ישנה אריכות מיותרת בקוד
# זהו... הרבה הנאה!!!!
if __name__ == "__main__":

        def find_next_greater(arr):
            n = len(arr)
            result = [-1] * n  # Initialize result array with -1
            stack = []  # Stack to keep track of indices

            for i in range(n):
                # While stack is not empty and the current element is greater
                while stack and arr[i] > arr[stack[-1]]:
                    index = stack.pop()
                    result[index] = arr[i]  # Assign the current element as the next greater

                stack.append(i)  # Push current index onto the stack

            # The result array now contains the next greater elements
            return result


            # Example usage
        arr = [7, 1, 30, 3, 12, 18, 9, 2]
        print(find_next_greater(arr))

